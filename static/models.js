"use strict"

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
    const cupcakeList = cupcakeData.cupcakes.map(cupcake => new Cupcake(cupcake))

    return cupcakeList;
  }

  static async addCupcake(flavor, size, rating, image_url) {
    const response = await fetch(`${BASE_URL}/api/cupcakes`, {
      method: "POST",
      body: JSON.stringify({
          flavor: flavor,
          size: size,
          rating: rating,
          image_url: image_url
      }),
      headers: {"Content-Type": "application/json"}
    });

    const jsonResponse = await response.json();

    return new Cupcake(jsonResponse.cupcake);
  }
}



