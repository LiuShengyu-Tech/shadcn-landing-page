import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, Loader2, FileText } from "lucide-react";

const DEFAULT_ORCID = "0009-0007-8547-8677";

// Map DOI → local image path. Add entries here to show a thumbnail for a paper.
// e.g. "10.1016/j.procir.2024.01.001": "/assets/papers/paper1.png"
const PAPER_IMAGES: Record<string, string> = {

  "10.1016/j.jclepro.2026.147893": "/assets/papers/journal_of_cleaner_production.jpg",
   "10.1016/j.procir.2024.12.119": "/assets/papers/lce_2025.jpg",
};

interface ExternalId {
  "external-id-type": string;
  "external-id-value": string;
  "external-id-url"?: { value: string } | null;
}

interface WorkSummary {
  "put-code": number;
  title: {
    title: { value: string };
    subtitle?: { value: string } | null;
  };
  "publication-date": {
    year?: { value: string } | null;
    month?: { value: string } | null;
  } | null;
  "journal-title"?: { value: string } | null;
  type: string;
  "external-ids"?: { "external-id": ExternalId[] } | null;
  url?: { value: string } | null;
}

interface Publication {
  putCode: number;
  title: string;
  year: string | null;
  journal: string | null;
  type: string;
  doi: string | null;
  url: string | null;
}

function parseSummary(summary: WorkSummary): Publication {
  const extIds = summary["external-ids"]?.["external-id"] ?? [];
  const doiEntry = extIds.find((e) => e["external-id-type"] === "doi");
  const doi = doiEntry ? doiEntry["external-id-value"] : null;
  const doiUrl = doiEntry?.["external-id-url"]?.value ?? null;

  return {
    putCode: summary["put-code"],
    title: summary.title.title.value,
    year: summary["publication-date"]?.year?.value ?? null,
    journal: summary["journal-title"]?.value ?? null,
    type: summary.type,
    doi,
    url: doiUrl ?? summary.url?.value ?? (doi ? `https://doi.org/${doi}` : null),
  };
}

function typeLabel(type: string): string {
  return type
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export const Publications = ({ orcid = DEFAULT_ORCID }: { orcid?: string }) => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://pub.orcid.org/v3.0/${orcid}/works`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`ORCID API error: ${res.status}`);
        const data = await res.json();
        const groups: { "work-summary": WorkSummary[] }[] = data.group ?? [];
        const parsed = groups
          .map((g) => g["work-summary"]?.[0])
          .filter(Boolean)
          .map(parseSummary)
          .sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0));
        setPublications(parsed);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load publications");
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, [orcid]);

  return (
    <section id="publications" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Publications
        </span>
      </h2>


      {loading && (
        <div className="flex justify-center items-center py-16 text-muted-foreground gap-2">
          <Loader2 className="animate-spin" size={20} />
          <span>Loading publications…</span>
        </div>
      )}

      {error && (
        <div className="text-center text-destructive py-10">
          <BookOpen className="mx-auto mb-2" size={32} />
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && publications.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          No publications found for this ORCID.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {publications.map((pub) => {
          const thumb = pub.doi ? PAPER_IMAGES[pub.doi] : null;
          return (
            <Card
              key={pub.putCode}
              className="bg-muted/50 hover:bg-muted/80 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-stretch">
                {/* Thumbnail — top on mobile, right on sm+ */}
                <div className="order-first sm:order-last shrink-0 mx-4 mt-4 mb-0 sm:my-4 sm:mr-4 sm:ml-0 h-44 sm:h-auto sm:w-36 rounded-md overflow-hidden border bg-background flex items-center justify-center">
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={pub.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FileText className="text-muted-foreground/40" size={40} />
                  )}
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-base font-semibold leading-snug">
                        {pub.url ? (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="hover:text-primary transition-colors"
                          >
                            {pub.title}
                          </a>
                        ) : (
                          pub.title
                        )}
                      </CardTitle>
                      {pub.url && (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="shrink-0 text-muted-foreground hover:text-primary transition-colors mt-0.5"
                          aria-label="Open publication"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                    {pub.journal && (
                      <CardDescription className="italic">
                        {pub.journal}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="flex items-center gap-2 flex-wrap pt-0">
                    <Badge variant="secondary">{typeLabel(pub.type)}</Badge>
                    {pub.year && <Badge variant="outline">{pub.year}</Badge>}
                    {pub.doi && (
                      <span className="text-xs text-muted-foreground font-mono break-all">
                        DOI: {pub.doi}
                      </span>
                    )}
                  </CardContent>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
