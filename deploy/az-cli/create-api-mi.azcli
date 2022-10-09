rnd=030
grp=foodapp-$rnd
loc=westeurope
appPlan=foodplan-$rnd
app=foodapi-$rnd
vault=foodvault-$rnd
identity=ui-food-$rnd

# appservice

az group create -n $grp -l $loc

az appservice plan create -n $appPlan -g $grp --sku FREE 

az webapp create -n $app -g $grp --plan $appPlan --runtime "DOTNET|6.0"

echo "FoodApi Url: http://$app.azurewebsites.net"

# managed identity

az webapp identity assign -g $grp -n $app 

mi=$(az webapp identity show  -g $grp -n $app --query principalId -o tsv)

echo "managed identity object id: $mi"

az keyvault set-policy -n $vault --object-id $mi --secret-permissions list get