// Next config derives this list from the feature folders present on this branch.
const sections: string[] = JSON.parse(process.env.NEXT_PUBLIC_PROTECTED_SECTIONS ?? "[]");

export function isSectionAvailable(href: string): boolean {
  return href === "/" || sections.includes(href.split("/")[1]);
}
