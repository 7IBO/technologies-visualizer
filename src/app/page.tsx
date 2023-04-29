import { redirect } from "next/navigation";

const getData = async () => {
  redirect("/search");
};

const Home = async () => {
  await getData();
};

export default Home;
