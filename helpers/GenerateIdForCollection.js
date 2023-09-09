const generateIdForCollection = (collection) =>{
  let id = 1
  collection.forEach(row => {
    if(row.id >= id)
      id = row.id + 1
  })

  return id
}

export default generateIdForCollection
