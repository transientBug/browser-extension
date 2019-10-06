export interface Endpoint {
  name: string;
  endpoint: string;
  clientId?: string;
}

const endpoints: Endpoint[] = [
  {
    name: "Production",
    endpoint: "https://transientbug.ninja",
    clientId: "755999239a453f73ab1108d0b94e194e3f54b51255283877f56ce6917e7f8995"
  },
  {
    name: "Staging",
    endpoint: "https://staging.transientbug.ninja",
    clientId: "1f9e449bc6afd7c7b2bcb48d9506a55bc7a3221238e61acfdb208ec2dca3a11a"
  },
  {
    name: "Localhost",
    endpoint: "http://localhost:3000",
    clientId: "abcplzreplaceme"
  }
];

export default endpoints;
