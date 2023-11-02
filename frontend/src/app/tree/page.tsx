import React from "react";
import {TreePost} from "@/app/components/TreePost";
import {Comment} from "@/app/components/CommentPost";


export default function Tree() {
    let tree = {
        treeAddress: "1600 Gold Ave NE",
        treeInfo: "You can find this tree on the corner of Gold and 4th. The apples are a little sweet making them perfect for cooking your favorite fall recipes with. I recommend going soon before they rot.",
        treeSpecies: "apple",
        treeTitle: "a cool tree downtown",
        treeVote:"2"
    }
    let treeImages = [{imageUrl: "https://images.unsplash.com/photo-1437964706703-40b90bdf563b?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "apple tree"}, {imageUrl: "https://images.unsplash.com/photo-1545308562-050974fb9ac4?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "apple tree"}, {imageUrl: "https://images.unsplash.com/photo-1437964706703-40b90bdf563b?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "apple tree"}]

    return (
        <>
            <section className="md:mx-16 rounded-lg bg-primary p-20 my-12">
         <TreePost treeImages={treeImages} tree={tree}/>
            <Comment commentContent={"I loved the apples from this tree! They were perfect for my home brew."} profileName={"nacholibre"}/>
            </section>
        </>
    )
}