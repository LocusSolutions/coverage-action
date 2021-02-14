# Usage

```yaml
# Download artifacts from last main branch run
- name: Download artifact
  uses: dawidd6/action-download-artifact@v2
  continue-on-error: true
  with:
    github_token: ${{secrets.GITHUB_TOKEN}}
    workflow: tests.yml
    branch: develop
    name: TestSummary_${{ github.event.pull_request.base.sha }}
    path: .\Reports\Target

- name: Run Tests
  run: dotnet test .\Source\AmkIkt.sln /p:CollectCoverage=true /p:CoverletOutputFormat=opencover /p:CoverletOutput="codecoverage.opencover.xml" -v q

- name: Create coverage reports
  run: |
    dotnet new tool-manifest
    dotnet tool install dotnet-reportgenerator-globaltool --version 4.8.5
    dotnet tool run reportgenerator -reports:**\codecoverage.*.xml -targetdir:.\Reports\Current\Server -reporttypes:"HtmlInline_AzurePipelines;JsonSummary" -assemblyfilters:"+Server.*"

- uses: LocusSolutions/coverage-action@v1
  continue-on-error: true
  with:
    REPO_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    SHA: ${{ github.event.pull_request.head.sha}}
    TITLE: 'Code Coverage - Server'
    CURRENT_SUMMARY_PATH: .\Reports\Current\Server\Summary.json
    TARGET_SUMMARY_PATH: .\Reports\Target\Server\Summary.json
```
