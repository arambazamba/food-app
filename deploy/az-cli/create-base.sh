rnd=099
grp=foodapp-$rnd
loc=westeurope
ai=foodapp-ai-$rnd
vault=foodvault-$rnd
cfg=foodconfig-$rnd
principal=http://foodapp-$rnd
feature=MailFeature
identity=ui-food-$rnd

az group create -n $grp -l $loc

az identity create -g $grp -l $loc -n $identity 

# keyvault
az keyvault create -l $loc -n $vault -g $grp --sku standard

az keyvault secret set --vault-name $vault --name "SQLiteDBConnection" --value "Data Source=./food.db"

az keyvault secret set --vault-name $vault --name "SQLServerConnection" --value "REPLACE"

# mail send

az keyvault secret set --vault-name $vault --name "tenantId" --value "REPLACE"

az keyvault secret set --vault-name $vault --name "clientId" --value "REPLACE"

az keyvault secret set --vault-name $vault --name "clientSecret" --value "REPLACE"

az keyvault secret set --vault-name $vault --name "mailSender" --value "REPLACE"

# static webapp

az keyvault secret set --vault-name $vault --name "swDeploymentToken" --value "REPLACE"

az keyvault secret set --vault-name $vault --name "githubRepoToken" --value "REPLACE"

# app-insights
az monitor app-insights component create --app $ai -l $loc --kind web -g $grp --application-type web --retention-time 30

aikey=$(az monitor app-insights component show --app $ai -g $grp --query instrumentationKey -o tsv)

az keyvault secret set --vault-name $vault --name "ApplicationInsights" --value $aikey

# app config
az appconfig create -g $grp -n $cfg -l $loc --sku free

az appconfig kv set -n foodconfig-$rnd --key "App:UseSQLite" --value false -y

az appconfig kv set -n foodconfig-$rnd --key "App:UseAppConfig" --value false -y

az appconfig kv set -n foodconfig-$rnd --key "GraphCfg:mailSender" --value "alexander.pajer@integrations.at" -y

az appconfig kv set-keyvault -n $cfg --key "App:ConnectionStrings:SQLiteDBConnection" --secret-identifier "https://$vault.vault.azure.net/Secrets/SQLiteDBConnection" -y

az appconfig kv set-keyvault -n $cfg --key "App:ConnectionStrings:SQLServerConnection" --secret-identifier "https://$vault.vault.azure.net/Secrets/SQLServerConnection" -y

az appconfig kv set-keyvault -n $cfg --key "GraphCfg:tenantId" --secret-identifier "https://$vault.vault.azure.net/Secrets/tenantId" -y

az appconfig kv set-keyvault -n $cfg --key "GraphCfg:clientId" --secret-identifier "https://$vault.vault.azure.net/Secrets/clientId" -y

az appconfig kv set-keyvault -n $cfg --key "GraphCfg:clientSecret" --secret-identifier "https://$vault.vault.azure.net/Secrets/clientSecret" -y

az appconfig kv set-keyvault -n $cfg --key "GraphCfg:mailSender" --secret-identifier "https://$vault.vault.azure.net/Secrets/mailSender" -y

# app config create a feature flag and turn it on

az appconfig feature set -n $cfg --feature $feature -y

az appconfig feature enable -n $cfg --feature $feature -y

# app config create a mi & assign permissions on keyvault
az appconfig identity assign -g $grp -n $cfg

miConfig=$(az appconfig identity show  -g $grp -n $cfg --query principalId -o tsv)

echo "managed identity object id: $miConfig"

az keyvault set-policy -n $vault --object-id $miConfig --secret-permissions list get


# create a service principal & assign permissions on keyvault

# az ad sp create-for-rbac -n $principal --sdk-auth

# az keyvault set-policy -n $vault --spn $principal --secret-permissions get list
