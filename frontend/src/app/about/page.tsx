export default function About() {
    return (
        <>
            <section className="bg-primary p-6 md:mx-56 my-12 drop-shadow-lg">
                <h1 className="text-3xl text-neutral font-semibold">About the Project</h1>
                <div className="p-6 text-lg">
                    <p>
                        Urban Orchard was created as a capstone project for CNM Ingenuity's Deep Dive Full Stack bootcamp. With this project we hope to not only make fruit more accessible to the public but to also reduce food waste and build more sustainable pathways to fresh produce.
                    </p>
                </div>
            </section>
            <section className="bg-primary p-6 md:mx-56 my-12 drop-shadow-lg">
                <h2 className="text-3xl pb-6 text-neutral font-semibold">About the Developers</h2>
                <div className="flex md:flex-row flex-col gap-12">
                    <div>
                        <div>
                            <img className="rounded-full mx-auto pb-4" src="http://placekitten.com/200/300" alt=""/>
                        </div>
                        <h2 className="text-neutral font-semibold text-center text-xl">Nic Crow, MBA, DASM</h2>
                        <p className="">Nic is an accomplished project manager, dedicated web developer, and enthusiastic problem solver. After nearly a decade in public affairs, they are excited to leverage their communications and organizational strengths in the tech sphere. Nic is a committed team player who brings a positive attitude and winning strategy to their projects.</p>
                        <div className="pt-2 flex justify-center font-semibold">
                            <p><a href="https://github.com/28Nic">GitHub </a> |
                                <a href="https://www.linkedin.com/in/nic-crow/"> LinkedIn</a></p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="rounded-full mx-auto pb-4 w-full" src="/Jordan.jpg" alt="Urban Orchard developer Jordan smiling against a white background"/>
                        </div>
                        <h2 className="text-neutral font-semibold text-center text-xl">Jordan DeRaad</h2>
                        <p className="">Jordan is a passionate marketing and media professional with a vision for starting a marketing and communications company focused on the aerospace division in New Mexico. He has experience in web development, video editing, and social media marketing. Jordan is eager to help aerospace companies in New Mexico reach their marketing and communications goals.
                        </p>
                        <div className=" pt-2 flex justify-center font-semibold">
                            <p><a href="https://github.com/JordanDeRaad">GitHub </a> |
                                <a href="www.linkedin.com/in/jordan-deraad-5951a024a"> LinkedIn</a></p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="rounded-full mx-auto pb-4" src="/Rashaan.jpg" alt="Urban Orchard developer Rashaan"/>
                        </div>
                        <h2 className="text-neutral font-semibold text-center text-xl">Rashaan Marrow</h2>
                        <p className="">Rashaan is a dedicated developer and beyond that she is a blogger with a passion for creating visually appealing and functional websites. Rashaan excels in both web development and design, showcasing a keen eye for aesthetics and user experience. Rashaan extends creativity to the digital realm by maintaining an engaging blog. Rashaan is happy to make a lasting impact in the dynamic world of web development.</p>
                        <div className="pt-2 flex justify-center font-semibold">
                            <p><a href="https://github.com/rmarrow">GitHub </a> |
                                <a href="www.linkedin.com/in/rashaan-m-15328a283/"> LinkedIn</a></p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="mt-20 pt-12">

            </div>
        </>
    )
}