fence_start <- function(highlights = NULL) {
  highlight_str <- if (!is.null(highlights)) {
    # If the input contains a hyphen, it's a range
    if (grepl("-", highlights)) {
      # Split on hyphen and expand the range
      range_nums <- as.numeric(strsplit(highlights, "-")[[1]])
      paste(range_nums[1]:range_nums[2], collapse = ",")
    } else {
      # Either single value or comma-separated values - pass through
      highlights
    }
  } else {
    NULL
  }
  
  if (!is.null(highlight_str)) {
    sprintf("````{.r code-line-numbers='%s'}\n", highlight_str)
  } else {
    "````{.r}\n"
  }
}

surveycode <- function(highlights = NULL) {
  survey_text <- '---
format: html
echo: false
warning: false
---

```{r}
library(surveydown)
```

::: {#welcome .sd-page}

# Welcome to our survey!

```{r}
sd_question(
  type  = "mc",
  id    = "penguins",
  label = "What\'s your favorite penguin?",
  option = c(
    "Adélie"    = "adelie",
    "Chinstrap" = "chinstrap",
    "Gentoo"    = "gentoo"
  )
)

sd_next()
```

:::

::: {#end .sd-page}

This is the last page of the survey.

```{r}
sd_close()
```

:::'

  cat(fence_start(highlights))
  cat(survey_text)
  cat("\n````")
}

appcode <- function(highlights = NULL) {
  app_text <- '# Load Package
library(surveydown)

# Database Credentials
sd_db_config()

# Connect to Database
db <- sd_db_connect()

# Server Setup
server <- function(input, output, session) {

  # Skip logic
  sd_skip_forward(...)

  # Conditional display
  sd_show_if(...)

  # Server settings
  sd_server(
    db = db,
    ...
  )
}

# Launch Survey
shiny::shinyApp(ui = sd_ui(), server = server)'

  cat(fence_start(highlights))
  cat(app_text)
  cat('\n````')
}