env=$1
grp=az400-m015-$env
loc=westeurope
app=foodui
img=$2
dns=$3
usr=$4
pwd=$5

az group create -n $grp -l $loc
az container create -g $grp -l $loc -n $app --image $img --cpu 1 --memory 1 --dns-name-label $dns --port 80 --registry-username $usr --registry-password $pwd