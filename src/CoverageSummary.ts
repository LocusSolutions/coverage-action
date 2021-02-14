/* eslint-disable  @typescript-eslint/no-explicit-any */

interface ICodeCoverageSummary {
  assemblies: number
  assembliesDelta: number
  classes: number
  classesDelta: number
  files: number
  filesDelta: number
  coveredlines: number
  coveredlinesDelta: number
  uncoveredlines: number
  uncoveredlinesDelta: number
  coverablelines: number
  coverablelinesDelta: number
  totallines: number
  totallinesDelta: number
  linecoverage: number
  linecoverageDelta: number
  coveredbranches: number
  coveredbranchesDelta: number
  totalbranches: number
  totalbranchesDelta: number
  branchcoverage: number
  branchcoverageDelta: number
}

function getCorrectSign(value: number): string {
  if (value > 0) return '+'
  return ''
}

export async function GetCoverageSummary(target: any, current: any): Promise<ICodeCoverageSummary> {
  if (target == null) {
    target = {
      assemblies: 0,
      assembliesDelta: 0,
      classes: 0,
      classesDelta: 0,
      files: 0,
      filesDelta: 0,
      coveredlines: 0,
      coveredlinesDelta: 0,
      uncoveredlines: 0,
      uncoveredlinesDelta: 0,
      coverablelines: 0,
      coverablelinesDelta: 0,
      totallines: 0,
      totallinesDelta: 0,
      linecoverage: 0,
      linecoverageDelta: 0,
      coveredbranches: 0,
      coveredbranchesDelta: 0,
      totalbranches: 0,
      totalbranchesDelta: 0,
      branchcoverage: 0,
      branchcoverageDelta: 0
    } as ICodeCoverageSummary
  }

  const assembliesDelta = current.summary.assemblies - target.summary.assemblies
  const classesDelta = current.summary.classes - target.summary.classes
  const filesDelta = current.summary.files - target.summary.files
  const coveredlinesDelta = current.summary.coveredlines - target.summary.coveredlines
  const uncoveredlinesDelta = current.summary.uncoveredlines - target.summary.uncoveredlines
  const coverablelinesDelta = current.summary.coverablelines - target.summary.coverablelines
  const totallinesDelta = current.summary.totallines - target.summary.totallines
  const linecoverageDelta = current.summary.linecoverage - target.summary.linecoverage
  const coveredbranchesDelta = current.summary.coveredbranches - target.summary.coveredbranches
  const totalbranchesDelta = current.summary.totalbranches - target.summary.totalbranches
  const branchcoverageDelta = current.summary.branchcoverage - target.summary.branchcoverage

  return {
    assemblies: current.summary.assemblies,
    assembliesDelta,
    classes: current.summary.classes,
    classesDelta,
    files: current.summary.files,
    filesDelta,
    coveredlines: current.summary.coveredlines,
    coveredlinesDelta,
    uncoveredlines: current.summary.uncoveredlines,
    uncoveredlinesDelta,
    coverablelines: current.summary.coverablelines,
    coverablelinesDelta,
    totallines: current.summary.totallines,
    totallinesDelta,
    linecoverage: current.summary.linecoverage,
    linecoverageDelta,
    coveredbranches: current.summary.coveredbranches,
    coveredbranchesDelta,
    totalbranches: current.summary.totalbranches,
    totalbranchesDelta,
    branchcoverage: current.summary.branchcoverage,
    branchcoverageDelta
  } as ICodeCoverageSummary
}

export async function CreateCoverageSummary(coverage: ICodeCoverageSummary): Promise<string> {
  /* prettier-ignore */
  return `
| Type  | Current coverage | Delta from HEAD |
|---|---|---:|
| Assemblies        | ${coverage.assemblies}        | ${getCorrectSign(coverage.assembliesDelta)}${coverage.assembliesDelta}           |
| Classes           | ${coverage.classes}           | ${getCorrectSign(coverage.classesDelta)}${coverage.classesDelta}                 |
| Files             | ${coverage.files}             | ${getCorrectSign(coverage.filesDelta)}${coverage.filesDelta}                     |
| Covered Lines     | ${coverage.coveredlines}      | ${getCorrectSign(coverage.coveredlinesDelta)}${coverage.coveredlinesDelta}       |
| Uncovered Lines   | ${coverage.uncoveredlines}    | ${getCorrectSign(coverage.uncoveredlinesDelta)}${coverage.uncoveredlinesDelta}   |
| Coverable Lines   | ${coverage.coverablelines}    | ${getCorrectSign(coverage.coverablelinesDelta)}${coverage.coverablelinesDelta}   |
| Total Lines       | ${coverage.totallines}        | ${getCorrectSign(coverage.totallinesDelta)}${coverage.totallinesDelta}           |
| Line Coverage     | ${coverage.linecoverage}%     | ${getCorrectSign(coverage.linecoverageDelta)} ${coverage.linecoverageDelta.toFixed(2)}%      |
| Covered Branches  | ${coverage.coveredbranches}   | ${getCorrectSign(coverage.coveredbranchesDelta)}${coverage.coveredbranchesDelta} |
| Total Branches    | ${coverage.totalbranches}     | ${getCorrectSign(coverage.totalbranchesDelta)}${coverage.totalbranchesDelta}     |
| Branch Coverage   | ${coverage.branchcoverage}%   | ${getCorrectSign(coverage.branchcoverageDelta)}${coverage.branchcoverageDelta.toFixed(2)}%  |
`
}
