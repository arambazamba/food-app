env=$1
loc=westeurope
grp=az400-m06-IaC
appPlan=food-iac-$env
app=foodcatalog-$env

az group create -n $grp -l $loc

az appservice plan create -n $appPlan -g $grp --sku FREE 

az webapp create -n $app -g $grp --plan $appPlan --runtime "DOTNET|6.0"
