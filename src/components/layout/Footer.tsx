import { Container } from "@/components/layout/Container";

export function Footer() {
    return (
        <footer className="border-t py-12 bg-background/50 backdrop-blur-sm">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Juan Lucas Gordillo Hernández. All rights reserved.
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <a
                            href="https://github.com/gooorher"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/juan-lucas-gordillo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
