import json

# Script to sort by a key so the frontend won't have to
def sort_by_year_completion(input_file: str):
    # Read data from input file
    with open(input_file, "r") as f:
        data = json.load(f)

    # Sort the data by year_completion
    sorted_data = sorted(data, key=lambda x: x["year_completion"])

    # Create the output filename
    output_file = input_file.replace(".json", "_sorted.json")

    # Write sorted data to the new file
    with open(output_file, "w") as f:
        json.dump(sorted_data, f, separators=(",", ":"))  # Most compact according to docs

    print(f"Sorted file created: {output_file}")


# Usage
sort_by_year_completion(r"app\utils\data\cscale\cscale_testset.json")
