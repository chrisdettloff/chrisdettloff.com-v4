import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
    const posts = await getCollection("blog");
    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: "https://www.chrisdettloff.com",
        items: posts.map((post) => ({
            ...post.data,
            link: `/blog/${post.slug}/`,
        })),
    });
}
