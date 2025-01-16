
# TODO List

* Have new company header buttons not shuffle around on load briefly
* Fix children rendering/passing as props override for React grid
* Experiment with generating data for some charts rather than go loading it from some json; might be faster.
* Make charts generic
  [x] Add metadata like "xaxis", "yaxis" to datasets to have them be able to slot in without editing chart code
  [ ] Add more metadata to pre-render charts with expected, static x-/y-axis ranges
  * Including adding the empty data pre-render methods to the base chart
  [ ] Try and have an idea per company that comes up with a creative insight to chart
* More datasets
  [] Define data models for other use-cases/verticals
  [] Add other example companies', spool up example data using data models
  [] Don't fret about folder structure for now, do that and a real DB later
[] Make a tabulated landing page per use case, once more datasets/charts created
[] Make for a "real" database/redis cache setup, even if its done locally
[] Add badges
  [x] Badge that say "alpha"/"beta"
  [x] Badge that says "graphQL"/"REST"
  [] Badge for industry topics covered by some company
[] Add links
  [x] Github
  [] Climatedrift
  [] Each company ought to have some links -- use a link icon that looks like the up-right arrow
[] Test for data binding and caching with the recharts as I try to reuse chart elements and ingest other data
[x] Move domains to the `.org` one
* Keep adding ideas/thoughts to this list, instead of running down rabbit holes
