rnd=030
grp=foodapp-$rnd
loc=westeurope
appPlan=foodplan-$rnd
app=foodapi-$rnd
cfg=foodconfig-$rnd

az group create -n $grp -l $loc

az appservice plan create -n $appPlan -g $grp --sku FREE 

az webapp create -n $app -g $grp --plan $appPlan --runtime "DOTNET|6.0"

az appconfig kv set -n foodconfig-$rnd --key "apiUrl" --value http://$app.azurewebsites.net -y