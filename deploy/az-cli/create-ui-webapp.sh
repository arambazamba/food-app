grp=foodapp-$1
loc=westeurope
appPlan=foodplan-$1
app=foodui-$1

az group create -n $grp -l $loc

az appservice plan create -n $appPlan -g $grp --sku FREE

az webapp create -n $app -g $grp --plan $appPlan --runtime "aspnet|V4.8"

echo "Web Url: http://$app.azurewebsites.net"
