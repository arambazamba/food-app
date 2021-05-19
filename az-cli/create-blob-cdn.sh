rnd=030
grp=foodapp-$rnd
loc=westeurope
acct=ngfoodui$rnd
vault=foodvault-$rnd
path='./FoodUI/dist/FoodUI'

az group create -n $grp -l $loc

az storage account create -l $loc -n $acct -g $grp --sku Standard_LRS

key=$(az storage account keys list -n $acct --query [0].[value] -o tsv)

az keyvault secret set --vault-name $vault --name "uiBlobKey" --value $key

#  echo "Website Key: " $key

ep=$(az storage account show -g $grp -n $acct --query "primaryEndpoints.web")

# echo "Primary Endpoint for Static Web: " $ep

az storage blob service-properties update --account-name $acct --static-website --404-document error.html --index-document index.html

