
const BASE_URL = "http://localhost:5000"

class Cupcake {

  constructor({id, flavor, size, rating, image_url}) {
    this.id = id;
    this.flavor = flavor;
    this.size = size;
    this.rating = rating;
    this.image_url = image_url
  }

  static async getCupcakes() {
    const response = await fetch(`${BASE_URL}/api/cupcakes`, {
      method: "GET"
    });

    const cupcakeData = await response.json();

    const cupcakes = cupcakeData.map(cupcake => new Cupcake(cupcake))

    return cupcakes;
  }

}