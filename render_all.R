project_path <- "."
quarto_dir <- file.path(project_path, ".quarto")

if(dir.exists(quarto_dir)) {
  unlink(quarto_dir, recursive = TRUE, force = TRUE)
}

qmd_files <- list.files(path = project_path, pattern = "\\.qmd$",
                        full.names = TRUE, recursive = TRUE)

for(qmd_file in qmd_files) {
  quarto::quarto_render(input = qmd_file)
}
