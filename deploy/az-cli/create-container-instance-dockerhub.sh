    grp=az400-m03-container
    loc=westeurope
    app=food-catalog-api-aci
    img=$1
    dns=$2
    usr=$3
    pwd=$4

    az group create -n $grp -l $loc
    az container create -g $grp -l $loc -n $app --image $img --cpu 1 --memory 1 --dns-name-label $dns --port 80