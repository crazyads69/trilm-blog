"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import {
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Info,
  Quote,
} from "lucide-react";
import Image from "next/image";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div
      className={cn("prose prose-gray dark:prose-invert max-w-none", className)}
    >
      <ReactMarkdown
        components={{
          // Headers
          h1: ({ node, className, ...props }) => (
            <h1
              className={cn(
                "text-2xl font-bold mt-6 mb-4 tracking-tight",
                className
              )}
              {...props}
            />
          ),
          h2: ({ node, className, ...props }) => (
            <h2
              className={cn(
                "text-xl font-semibold mt-5 mb-3 tracking-tight",
                className
              )}
              {...props}
            />
          ),
          h3: ({ node, className, ...props }) => (
            <h3
              className={cn("text-lg font-semibold mt-4 mb-2", className)}
              {...props}
            />
          ),
          h4: ({ node, className, ...props }) => (
            <h4
              className={cn("text-base font-semibold mt-3 mb-2", className)}
              {...props}
            />
          ),

          // Paragraphs and text
          p: ({ node, className, ...props }) => (
            <p
              className={cn("text-base leading-relaxed my-3", className)}
              {...props}
            />
          ),
          em: ({ node, className, ...props }) => (
            <em className={cn("italic", className)} {...props} />
          ),
          strong: ({ node, className, ...props }) => (
            <strong className={cn("font-bold", className)} {...props} />
          ),

          // Links
          a: ({ node, className, href, children, ...props }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={cn(
                  "text-primary hover:text-primary/80 hover:underline font-medium transition-colors",
                  className
                )}
                {...props}
              >
                {children}
                {isExternal && (
                  <ExternalLink className="inline-block ml-1 h-3 w-3" />
                )}
              </a>
            );
          },

          // Lists
          ul: ({ node, className, ...props }) => (
            <ul
              className={cn("list-disc pl-6 my-4 space-y-2", className)}
              {...props}
            />
          ),
          ol: ({ node, className, ...props }) => (
            <ol
              className={cn("list-decimal pl-6 my-4 space-y-2", className)}
              {...props}
            />
          ),
          li: ({ node, className, ...props }) => (
            <li className={cn("text-base", className)} {...props} />
          ),

          // Code blocks
          code: ({
            className,
            ...props
          }: React.ClassAttributes<HTMLElement> &
            React.HTMLAttributes<HTMLElement> & { inline?: boolean }) =>
            props.inline ? (
              <code
                className={cn(
                  "px-1.5 py-0.5 rounded-md bg-muted font-mono text-sm",
                  className
                )}
                {...props}
              />
            ) : (
              <code
                className={cn(
                  "block bg-muted p-4 rounded-md font-mono text-sm my-4 overflow-x-auto",
                  className
                )}
                {...props}
              />
            ),
          pre: ({ node, className, ...props }) => (
            <pre
              className={cn("p-0 rounded-md overflow-hidden", className)}
              {...props}
            />
          ),
          blockquote: ({ node, className, ...props }) => (
            <blockquote
              className={cn(
                "border-l-4 border-primary/30 pl-4 py-1 my-4 italic text-muted-foreground",
                className
              )}
              {...props}
            >
              <div className="flex items-start">
                <Quote className="h-4 w-4 mr-2 mt-1 text-muted-foreground/70" />
                <div>{props.children}</div>
              </div>
            </blockquote>
          ),
          table: ({ node, className, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table
                className={cn("w-full border-collapse text-sm", className)}
                {...props}
              />
            </div>
          ),
          thead: ({ node, className, ...props }) => (
            <thead className={cn("bg-muted/50", className)} {...props} />
          ),
          tr: ({ node, className, ...props }) => (
            <tr
              className={cn("border-b border-border m-0 p-0", className)}
              {...props}
            />
          ),
          th: ({ node, className, ...props }) => (
            <th
              className={cn(
                "border border-border px-4 py-2 text-left font-semibold",
                className
              )}
              {...props}
            />
          ),
          td: ({ node, className, ...props }) => (
            <td
              className={cn(
                "border border-border px-4 py-2 text-left",
                className
              )}
              {...props}
            />
          ),
          hr: ({ node, className, ...props }) => (
            <hr className={cn("my-6 border-border", className)} {...props} />
          ),

          img: ({ node, src, alt, className, ...props }) => {
            if (!src) return null;

            // Check if it's an external URL
            const isExternal = src?.startsWith("http");

            return isExternal ? (
              <div className="my-6 rounded-md overflow-hidden">
                <img
                  src={src}
                  alt={alt || ""}
                  className={cn("rounded-md object-cover", className)}
                  {...props}
                />
              </div>
            ) : (
              <div className="my-6 rounded-md overflow-hidden relative">
                <Image
                  src={src}
                  alt={alt || ""}
                  width={720}
                  height={400}
                  className={cn("rounded-md", className)}
                />
              </div>
            );
          },
          div: ({ node, className, children, ...props }) => {
            const isInfoCallout = className?.includes("info-callout");
            const isWarningCallout = className?.includes("warning-callout");
            const isSuccessCallout = className?.includes("success-callout");

            if (isInfoCallout) {
              return (
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-md p-4 my-4 flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>{children}</div>
                </div>
              );
            }

            if (isWarningCallout) {
              return (
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-md p-4 my-4 flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                  <div>{children}</div>
                </div>
              );
            }

            if (isSuccessCallout) {
              return (
                <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-md p-4 my-4 flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>{children}</div>
                </div>
              );
            }

            return (
              <div className={className} {...props}>
                {children}
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
