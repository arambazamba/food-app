using System;
using FoodApp;
using HealthChecks.UI.Client;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;

namespace FoodApi
{
    public class Startup
    {
        public Startup(IWebHostEnvironment environment, IConfiguration configuration)
        {
            Configuration = configuration;
            env = environment;
        }

        public IConfiguration Configuration { get; }
        private readonly IWebHostEnvironment env;

        public void ConfigureServices(IServiceCollection services)
        {
            //Config
            services.AddSingleton<IConfiguration>(Configuration);
            var cfg = Configuration.Get<FoodConfig>();

            //Aplication Insights
            if(cfg.FeatureManagement.UseApplicationInsights)        {
                services.AddApplicationInsightsTelemetry();
                services.AddSingleton<ITelemetryInitializer, FoodTelemetryInitializer>();
                services.AddSingleton<AILogger>();   
            }

            //Database
            if (cfg.App.UseSQLite)
            {
                string dbconstring = cfg.App.ConnectionStrings.SQLiteDBConnection;

                if(cfg.FeatureManagement.UseKeyVaultWithMI)
                {
                    var azureServiceTokenProvider = new AzureServiceTokenProvider();
                    var kvClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(azureServiceTokenProvider.KeyVaultTokenCallback));            
                    dbconstring = (kvClient.GetSecretAsync(cfg.Azure.KeyVault, "conSQLite").Result).Value;
                    Console.WriteLine($"Using SQLLite with connection string from KeyVault: {cfg.Azure.KeyVault}");                                
                }
                else
                {
                    Console.WriteLine($"Using SQLite with connection string: {dbconstring}");                   
                }

                 services.AddDbContext<FoodDBContext>(options => options.UseSqlite(dbconstring));
            }
            else
            {
                Console.WriteLine("Using SQL Server");
                services.AddDbContext<FoodDBContext>(opts => opts.UseSqlServer(cfg.App.ConnectionStrings.SQLServerConnection));
            }

            //Microsoft Identity auth
            var az = Configuration.GetSection("Azure");
            if (cfg.App.AuthEnabled && az != null)
            {
                services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(az)
                .EnableTokenAcquisitionToCallDownstreamApi()
                .AddInMemoryTokenCaches();
                services.AddAuthorization();

                //Add auth policy instead of Autorize Attribute on Controllers
                services.AddControllers(obj =>
                {
                    var policy = new AuthorizationPolicyBuilder()
                        .RequireAuthenticatedUser()
                        .Build();
                    obj.Filters.Add(new AuthorizeFilter(policy));
                });
            }
            else
            {
                services.AddControllers();
            }

            //Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Food-Api", Version = "v1" });
            });

            // Cors
            services.AddCors(o => o.AddPolicy("nocors", builder =>
                {
                    builder
                        .SetIsOriginAllowed(host => true)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                }));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var cfg = Configuration.Get<FoodConfig>();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Swagger
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Food-Api");
                c.RoutePrefix = string.Empty;
            });

            //Cors and Routing
            app.UseCors("nocors");
            app.UseHttpsRedirection();
            app.UseRouting();

            //Set Authorize Attribute on Controllers using a policy
            if (cfg.App.AuthEnabled)
            {
                Console.WriteLine($"Using auth with App Reg: {cfg.Azure.ClientId}");
                app.UseAuthentication();
                app.UseAuthorization();
            }

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                if (cfg.FeatureManagement.UseHealthChecks)
                {
                    endpoints.MapHealthChecks("/hc", new HealthCheckOptions
                    {
                        Predicate = _ => true,
                        ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
                    });
                    endpoints.MapHealthChecks("/liveness", new HealthCheckOptions
                    {
                        Predicate = r => r.Name.Contains("self")
                    });
                }
            });
        }
    }
}