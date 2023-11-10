

export default function SubmitTree() {
    return (
        <>
            <form  className="md:w-1/2 md:auto mx-auto grid-cols-1 auto-rows-max gap-6 mt-8">
                <div>
                    <h2 className="text-3xl text-center text-neutral/80 font-semibold p-2">Submit a Tree</h2>
                </div>
                <div className="py-3 dropdown flex justify-center">
                    <label tabIndex={0} className="btn bg-secondary text-white m-1">Species</label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Apple</a></li>
                        <li><a>Apricot</a></li>
                        <li><a>Cherry</a></li>
                        <li><a>Fig</a></li>
                        <li><a>Peach</a></li>
                        <li><a>Pear</a></li>
                        <li><a>Plum</a></li>
                        <li><a>Pomegranate</a></li>
                        <li><a>Other</a></li>
                    </ul>
                </div>
                <div className="py-3">
                    <label htmlFor="title" className="block text-gray text-sm font-bold mb-2">Title</label>
                    <input type="text" id="title" name="title"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
                </div>
                <div className="py-3">
                    <label htmlFor="address" className="block text-gray text-sm font-bold mb-2">Address</label>
                    <input type="text" id="address" name="address"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
                </div>
                <div className="py-3">
                    <label htmlFor="info" className="block text-gray text-sm font-bold mb-2">Info</label>
                    <input type="text" id="info" name="info"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
                </div>
                <div className="py-3">
                    <label htmlFor="treeImage" className="block text-gray text-sm font-bold mb-2">Upload an Image</label>
                    <input type="email" id="email" name="email"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
                </div>
                <div className="py-3">
                    <button type="submit" className="bg-secondary hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                </div>
            </form>

        </>
    )
}