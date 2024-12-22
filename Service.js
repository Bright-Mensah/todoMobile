class Service {
  baseURL = "https://todobackend-production-0720.up.railway.app/";

  async getData(sendz) {
    try {
      const request = await fetch(
        `${this.baseURL}${sendz.url}?${sendz.params}`
      );

      if (!request.ok) {
        throw new Error(`Request failed with status ${request.status}`);
      }

      const response = await request.json();

      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async postData(sendz) {
    console.log({ sendz });
    try {
      const request = await fetch(`${this.baseURL}${sendz.url}`, {
        method: sendz.methodType,
        headers: {
          "Content-Type": "application/json", // Ensure the server interprets the body as JSON
        },
        body: JSON.stringify(sendz),
      });

      console.log("body ", request.url);

      const response = await request.json();

      return response;
    } catch (error) {
      console.log("ggg", error);
      throw error;
    }
  }
}

const service = new Service();

export default service;
