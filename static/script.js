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

async function handleCupcakeSubmit(evt) {
  evt.preventDefault();
  const flavor = $("#flavor").val();
  const size = $("#size").val()
  const rating = $("#rating").val()
  const image_url = $("#image_url").val()

  const newCupcake = await Cupcake.addCupcake(flavor, size, rating, image_url);
  const cupcakeDiv = makeCupcakeDiv(newCupcake);

  $CUPCAKE_CONTAINER.append(cupcakeDiv);
}

$("#add-cupcake").on("submit", handleCupcakeSubmit)

//conductor function that gets list of cupcakes
async function start() {
  console.debug('Start')
  cupcakeList = await Cupcake.getCupcakes();
  makeCupcakeList(cupcakeList);
}

start()