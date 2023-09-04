"use strict"

let cupcakeList;

const $CUPCAKE_CONTAINER = $('#cupcakeContainer');

function makeCupcakeList(cupcakeList) {
  console.debug('makeCupcakeList')
  for (const cupcake of cupcakeList) {

    const $cupcakeDiv = makeCupcakeDiv(cupcake);

    $CUPCAKE_CONTAINER.append($cupcakeDiv);
  }
}

function makeCupcakeDiv(cupcake) {
  console.debug('makeCupcakeDiv')
    return $(`
    <div>
      <img src="${cupcake.image_url}" alt="cupcake photo" width="200px">
      <p>${cupcake.flavor}</p>
      <p>rating: ${cupcake.rating}</p>
      <p>size: ${cupcake.size}</p>
    </div>
    `)
}

//conductor function that gets list of cupcakes
async function start() {
  console.debug('Start')
  cupcakeList = await Cupcake.getCupcakes();
  makeCupcakeList(cupcakeList);
}

start()