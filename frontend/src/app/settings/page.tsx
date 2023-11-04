import {Avatar} from "@/app/components/Avatar";

export default function Settings() {
    return (
        <>
            <form  className="md:w-1/2 md:auto mx-auto grid-cols-1 auto-rows-max gap-6 mt-8">
                <div>
                    <h2 className="text-3xl text-center text-neutral/80 font-semibold p-2">User Settings</h2>
                </div>
                <div className="flex justify-center">
                    <Avatar link={'https://placekitten.com/200/200'}/>
                </div>
                <div className="py-3">
                    <label htmlFor="name" className="block text-gray text-sm font-bold mb-2">Username</label>
                    <input type="text" id="name" name="name"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
                </div>
                <div className="py-3">
                    <label htmlFor="email" className="block text-gray text-sm font-bold mb-2">New Password</label>
                    <input type="email" id="email" name="email"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
                </div>
                <div className="py-3">
                    <label htmlFor="email" className="block text-gray text-sm font-bold mb-2">Confirm Password</label>
                    <input type="email" id="email" name="email"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
                </div>

                <div className="py-3">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Apply
                    </button>
                </div>
                <div className="py-3">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </form>

        </>
    )
}