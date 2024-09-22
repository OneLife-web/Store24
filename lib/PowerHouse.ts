export const getSettings = async () => {
  try {
    const res = await fetch("https://store45.vercel.app/api/settings", {
      method: "GET",
      cache: "no-store", // Disable caching for this fetch
    });

    if (!res.ok) {
      //throw new Error(`API error: ${res.status} - ${await res.text()}`);
    }

    const result = await res.json(); // Read body only once
    return result;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const res = await fetch("https://store45.vercel.app/api/product", {
      method: "GET",
      cache: "no-store", // Disable caching for this fetch
    });

    /* if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    } */

    const data = await res.json();
    return data?.products;
  } catch (error) {
    console.error("Error fetching prducts:", error);
    //throw error;
  }
};

export const fetchProduct = async (id?: string) => {
  try {
    const res = await fetch(`https://store45.vercel.app/api/product/${id}`, {
      method: "GET",
      cache: "no-store", // Disable caching for this fetch
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.product;
  } catch (error) {
    console.error("Error fetching prduct:", error);
    throw error;
  }
};
