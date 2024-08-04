export async function getProducts() {
  try {
    const response = await fetch("http://localhost:4000/products");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function createProduct(data: ProductCreate) {
  const response = await fetch("http://localhost:4000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  return result;
}

export async function deleteProduct(id: string) {
  const response = await fetch(`http://localhost:4000/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  return result;
}

export async function editProduct(product: ProductCreate, id: string) {
  const response = await fetch(`http://localhost:4000/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const result = await response.json();

  return result;
}
