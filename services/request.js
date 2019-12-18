export default function (object) {
    let method = object.method
    if(method=='post'){

    }else if(method=='put'){

    }else if(method=='delete'){

    }else{
        axios.get(path + `/api/equipment?tempTime=${tempTime}`).then((value => {
            let datas = value['data']
            let data = datas['data'] || []
            sessionStorage.setItem("equipment", JSON.stringify(data))
            resolve(data)
        }))
    }
}
