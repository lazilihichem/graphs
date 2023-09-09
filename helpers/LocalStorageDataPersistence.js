import generateIdForCollection from "~/helpers/GenerateIdForCollection";

class LocalStorageDataPersistence {
  list(resource){
    let resourceData = localStorage.getItem(resource)
    if(resourceData){
      resourceData = JSON.parse(resourceData)
      return resourceData
    }

    return []
  }

  show(resource, id){
    console.log('in persistence', resource, id)
    let resourceData = localStorage.getItem(resource)
    console.log(resourceData)
    if(resourceData){
      resourceData = JSON.parse(resourceData)
      return resourceData.find(row => row.id === id)
    }

    return {}
  }

  create(resource, data){
    let resourceData = localStorage.getItem(resource)
    let id = 1
    let created_at = (new Date()).getTime()
    if (resourceData){
      resourceData = JSON.parse(resourceData)
      id = generateIdForCollection(resourceData)
      resourceData.push({...data, id, created_at})
      resourceData = JSON.stringify(resourceData)
    }else{
      resourceData = JSON.stringify([{...data, id, created_at}])
    }
    localStorage.setItem(resource, resourceData)
    return id
  }

  update(resource, id, data){
    let resourceData = localStorage.getItem(resource)
    let updated_at = (new Date()).getTime()
    if (resourceData){
      resourceData = JSON.parse(resourceData)
      const index = resourceData.findIndex(row => row.id === id)
      const dataToInsert = Object.assign(resourceData[index], data)
      resourceData[index] = {...dataToInsert, updated_at}
      resourceData = JSON.stringify(resourceData)
    }
    localStorage.setItem(resource, resourceData)
  }

  delete(resource, id){
    let resourceData = localStorage.getItem(resource)
    let newData = resourceData
    if (resourceData){
      resourceData = JSON.parse(resourceData)
      newData = resourceData.filter(row => row.id !== id)
      newData = JSON.stringify(newData)
    }
    localStorage.setItem(resource, newData)
  }
}

const localStorageDataPersistence = new LocalStorageDataPersistence()

export default localStorageDataPersistence
