import React, { useState } from "react";
import Dropdown from "../components/Settings";
import Layout from "../components/Layout";

export default function index() {
  const [opti, setOpti] = useState(true);

  return (
    <Layout title="Dashboard">
      Halo Dunia Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quibusdam ea, ullam perspiciatis aut consequatur eum unde modi explicabo
      totam, rem enim? Repudiandae sint consequuntur numquam architecto nisi
      quidem quae adipisci deserunt tenetur, quam magni recusandae consequatur
      voluptatem. Quas impedit cupiditate iure labore adipisci magnam inventore
      quo esse, reiciendis consequatur ea minus ut odit dolore laudantium
      placeat molestias eos obcaecati, natus, quasi magni ipsam mollitia
      voluptatibus ipsum? Laborum enim exercitationem quia laboriosam
      perspiciatis laudantium, incidunt porro asperiores, vero necessitatibus
      quasi animi quibusdam repellat explicabo hic sed cum accusantium deserunt
      debitis. Doloremque aliquid reprehenderit est sed nulla iusto distinctio
      veniam labore repudiandae?
    </Layout>
  );
}
