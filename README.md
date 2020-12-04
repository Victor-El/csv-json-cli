# csv-json-cli
A command line utility for converting csv to/from json

## Installation

```bash
npm install -g @codeenzyme/csv-json-cli
```

## Usage

Generating CSV file from JSON file.

```bash
c2j csv file.json -f -o ./
```
* c2j => CLI tool
* csv => sub command for converting to csv
* file.json => the JSON file to be converted
* -f => to signify a single file
* -o => to specify an output directory

Generating CSV file from JSON file.
```bash
c2j csv ./ -d -o ./
```
* c2j => CLI tool
* csv => sub command for converting to csv
* ./ => input directory
* -d => to signify a single directory
* -o => to specify an output directory


Generating JSON file from CSV file.

```bash
c2j json file.csv -f -o ./
```
* c2j => CLI tool
* json => sub command for converting to json
* file.csv => the CSV file to be converted
* -f => to signify a single file
* -o => to specify an output directory
* -l => &lt;boolean> convert to JSON list?

Generating JSON dir from CSV dir.

```bash
c2j json file.csv -d -o ./
```
* c2j => CLI tool
* json => sub command for converting to json
* file.csv => the CSV file to be converted
* -d => to signify a single dir
* -o => to specify an output directory
* -l => &lt;boolean> convert to JSON list?