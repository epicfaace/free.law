import Layout, { PostColumn, PostSummary } from '../../components/layout';
import { H1 } from '../../components/headings';
import { getAllPostTags, getPostDataForTag } from '../../lib/tags';
import { getSortedPostsData } from '../../lib/posts';
import { NextSeo } from 'next-seo';

export async function getStaticProps({ params }) {
  const taggedPostsData = await getPostDataForTag(params.tag);
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      taggedPostsData,
      allPostsData,
      tag: params.tag,
    },
  };
}

export async function getStaticPaths() {
  const tags = await getAllPostTags();
  return {
    paths: tags,
    fallback: false,
  };
}

export default function TagPage({ taggedPostsData, allPostsData, tag }) {
  return (
    <Layout allPosts={allPostsData} home={false}>
      <NextSeo
        title={`Posts tagged with "${tag}"`}
        openGraph={{
          type: 'website',
          url: 'https://free.law/' + tag + '/',
        }}
      />
      <PostColumn>
        <div className="pt-10">
          <H1>Posts Tagged with "{tag}"</H1>
        </div>
        <div className="divide-y divide-gray-300">
          {taggedPostsData.map((post) => (
            <PostSummary post={post} />
          ))}
        </div>
      </PostColumn>
    </Layout>
  );
}
