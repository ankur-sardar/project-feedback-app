export const http = async (request: RequestInfo): Promise<any> => {
  return new Promise(resolve => {
    fetch(request)
      .then(response => response.json())
      .then(body => {
        resolve(body);
      });
  });
};

export default class EmployeeService {

  
  public async getEmployeeList() {
    const data = await http("http://localhost:9000/fetchListAPI");
    return data;
  }

  public handleErrors(response: any) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
}
