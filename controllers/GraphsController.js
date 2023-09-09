import localStorageDataPersistence from "~/helpers/LocalStorageDataPersistence";
import dateFormatter from "~/helpers/DateFormatter";

class GraphsController {
  persistence = null
  resource = 'networks'

  constructor(){
    this.persistence = localStorageDataPersistence
  }

  createNetwork(data){
    return this.persistence.create(this.resource, data)
  }

  list(){
    return this.persistence.list(this.resource)
  }

  seeNetwork(id){
    const network = this.persistence.show(this.resource, id)

    network.created_at =  dateFormatter.formatDateIntoHumanReadableFormat(network.created_at)
    network.updated_at =  dateFormatter.formatDateIntoHumanReadableFormat(network.updated_at)

    return network
  }

  networkDetails(id){
    const network = this.persistence.show(this.resource, id)

    network.created_at =  dateFormatter.formatDateIntoHumanReadableFormat(network.created_at)
    network.updated_at =  dateFormatter.formatDateIntoHumanReadableFormat(network.updated_at)

    network.nodes = network.nodes ?? []
    network.relationships = network.relationships ?? []

    network.relationships = network.relationships.map(relation => ({
      ...relation,
      from_name: network.nodes.find(node => node.id === relation.from).id,
      to_name: network.nodes.find(node => node.id === relation.to).id
    }))

    return network
  }

  updateNetwork(id, network){
    this.persistence.update(this.resource, id, network)
  }

  deleteNetwork(id){
    this.persistence.delete(this.resource, id)
  }
}

const graphController = new GraphsController()

export default graphController
