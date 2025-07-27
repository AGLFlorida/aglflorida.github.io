import { getPolicies } from "@/lib/getPolicies";
import { getSortedPosts } from "@/lib/getPosts";
import { getSortedProjects } from "@/lib/getProjects";
import { getSortedReleases } from "@/lib/getReleases";
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const posts = getSortedPosts();
  const projects = await getSortedProjects();
  const releases = await getSortedReleases();
  const policies = await getPolicies();

  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const releasePages = releases.map((release) => ({
    url: `${baseUrl}/releases/${release.id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const policyPages = policies.map((policy) => ({
    url: `${baseUrl}/policies/${policy.id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl!,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/policies`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...policyPages,
    {
      url: `${baseUrl}/blog/page/1`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts,
    {
      url: `${baseUrl}/projects`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectPages,
    {
      url: `${baseUrl}/people`,
      changeFrequency: 'monthly',
      priority: 0.25,
    },
    {
      url: `${baseUrl}/releases`,
      changeFrequency: 'monthly',
      priority: 0.125,
    },
    ...releasePages,
    {
      url: `${baseUrl}/security`,
      changeFrequency: 'monthly',
      priority: 0.125,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.125,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'monthly',
      priority: 0.125,
    }
  ];
}