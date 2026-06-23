import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";

import { NewsList } from "@/components/NewsList";

import { getNews } from "@/lib/content/news";



export const metadata: Metadata = {

  title: "Hírek és tudósítások",

  description:

    "Hírek, tudósítások és felhívások a Kalotaszegi Református Egyházmegye életéből.",

};



export default async function NewsPage() {

  const news = await getNews();

  const sorted = [...news].sort(

    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),

  );



  return (

    <>

      <PageHeader

        eyebrow="Aktuális"

        title="Hírek és tudósítások"

        description="Beszámolók, felhívások és hírek gyülekezeteink és az egyházmegye életéből."

        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Hírek" }]}

      />



      <section className="container-page py-16">

        <NewsList items={sorted} />

      </section>

    </>

  );

}

