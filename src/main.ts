import * as github from '@actions/github'
import * as core from '@actions/core'
import * as fs from 'fs'
import {CreateCoverageSummary, GetCoverageSummary} from './CoverageSummary'

async function run(): Promise<void> {
  try {
    let targetBranchRunOutput = null
    let currentBranchRunOutput = null

    /*
    Setup inputs
    */
    const token = core.getInput('REPO_TOKEN')
    const title = core.getInput('TITLE')
    const sha = core.getInput('SHA')
    const currentSummaryFile = core.getInput('CURRENT_SUMMARY_PATH')
    const targetSummaryFile = core.getInput('TARGET_SUMMARY_PATH')

    const octokit = github.getOctokit(token)

    /*
      Parse target branch summary
    */
    const currentBranchSummaryContent = fs.readFileSync(currentSummaryFile, 'utf-8').trim()
    if (currentBranchSummaryContent.length > 0) {
      currentBranchRunOutput = JSON.parse(currentBranchSummaryContent)
    } else {
      throw new Error('No current branch summary found')
    }

    /*
      Parse current branch summary
    */
    const targetBranchSummaryContent = fs.readFileSync(targetSummaryFile, 'utf-8').trim()
    if (targetBranchSummaryContent.length > 0) {
      targetBranchRunOutput = JSON.parse(targetBranchSummaryContent)
    }
    /*
      Create coverage output
    */
    try {
      const coverage = await GetCoverageSummary(targetBranchRunOutput, currentBranchRunOutput)
      const coverageSummary = await CreateCoverageSummary(coverage)

      /*
        Create status-check result
      */
      const payload = {
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        name: title,
        head_sha: sha,
        status: 'completed',
        conclusion: coverage.linecoverageDelta >= 0 ? 'success' : 'failure',
        output: {
          title: `Current code coverage is now ${coverage.linecoverage.toFixed(2)}%`,
          summary: `If this branch is merged, coverage will go ${coverage.linecoverageDelta >= 0 ? 'up' : 'down'} by ${Math.abs(coverage.linecoverageDelta).toFixed(2)}% `,
          text: coverageSummary
          // text:
        }
      }
      const response = await octokit.checks.create(payload)
      if (response.status !== 201) {
        throw new Error(`Failed to create status check. Error code: ${response.status}`)
      } else {
        core.info(`Created check successfully:'${payload.output.title}'`)
      }
    } catch (err) {
      core.info(`Error: ${err}`)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
