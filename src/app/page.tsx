import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Steps } from "@/components/steps";

export default function Home() {

  return (
    <>
      <Header />
      <Steps />
      <FAQ
        faqs={[
          { q: 'Lorem, ipsum dolor.', a: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex sapiente quia quibusdam, voluptatibus repellendus obcaecati dicta corrupti similique ducimus veritatis.' },
          { q: 'Lorem, ipsum dolor.', a: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex sapiente quia quibusdam, voluptatibus repellendus obcaecati dicta corrupti similique ducimus veritatis.' },
          { q: 'Lorem, ipsum dolor.', a: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex sapiente quia quibusdam, voluptatibus repellendus obcaecati dicta corrupti similique ducimus veritatis.' },
        ]}
      />
      <Footer />
    </>
  );
}
