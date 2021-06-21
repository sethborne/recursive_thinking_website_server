# https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/index.html#cli-aws-cloudformation

import sys
import argparse
import os
from os.path import abspath
from os.path import join
from os.path import dirname
from os.path import realpath
import posixpath
import shutil
import time
import datetime
import subprocess
import json
import colorama
from colorama import Fore, Back, Style
import errno

colorama.init()

cloudformationDeploySuccessDictionary = {
    "CREATE_COMPLETE": "CREATE_COMPLETE",
    "UPDATE_COMPLETE": "UPDATE_COMPLETE",
}


# Run this script from its directory (dir must contain the template) in your cli:
# Check all paths and make sure relative to current directory structure.
# ./deploy_cloudformation_template.py
# deploy_cloudformation_template.py


def call(*positional, **dictionary):
    print(
        Fore.BLUE + "exec: " + positional[0] + Style.RESET_ALL
    )  # using print(locals()) will print all args as a dict/map
    subprocess.call(*positional, **dictionary)


def check_output(*positional, **dictionary):
    print(
        Fore.BLUE + "exec: " + positional[0] + Style.RESET_ALL
    )  # using print(locals()) will print all args as a dict/map
    return subprocess.check_output(*positional, **dictionary)


# Methods for writing files


def mkdirP(path):
    try:
        os.makedirs(path)
    except OSError as exc:  # Python >2.5
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else:
            raise


def safeOpen(path, mode):
    """Open "path" for writing, creating any parent directories as needed."""
    mkdirP(os.path.dirname(path))
    return open(path, mode)


pathCloudformationTemplateFile = "../template/cloudformation_template.yml"
pathLambdaFolder = "../lambdas"

parser = argparse.ArgumentParser("rtw")
parser.add_argument(
    "--template",
    help="A file path to the CF template.  e.g. ./template.yml",
    default=pathCloudformationTemplateFile,
)
parser.add_argument(
    "--assets",
    help="A file path to the lambdas folder e.g. ./lambdas",
    default=pathLambdaFolder,
)
parser.add_argument("--stage", help="Stage to deploy the stack to", default="")
parser.add_argument(
    "--s3bucket", help="Name of the S3 bucket to deploy assets to"
)
# check pathing
parser.add_argument(
    "--website-directory",
    help="The directory of the website structure (so we can dump secrets into it.)",
    default=join("../..", "client/src/"),
)
parser.add_argument(
    "--region",
    help="The AWS region to create your assets in.",
    default="us-west-2",
)
args = parser.parse_args()

assetsS3bucket = args.s3bucket
userAssetsS3Bucket = args.s3bucket

# Note if your bucket name isn't unique (i.e., if it exists anywhere else, then it will be denied.)
if assetsS3bucket == None:
    if sys.version_info < (3, 0):
        stripedUserName = (
            check_output("git config --global user.email", shell=True)
            .replace("@", "-")
            .replace(".", "-")
            .rstrip()
        )
        assetsS3bucket = (
            "recursivethinking-rct-assets-"
            + args.region
            + "-"
            + stripedUserName
        )
        userAssetsS3Bucket = (
            "recursivethinking-rct-user-assets-"
            + args.region
            + "-"
            + stripedUserName
        )
    else:
        stripedUserName = (
            str(
                check_output("git config --global user.email", shell=True),
                "utf-8",
            )
            .replace("@", "-")
            .replace(".", "-")
            .rstrip()
        )
        assetsS3bucket = (
            "recursivethinking-rct-assets-"
            + args.region
            + "-"
            + stripedUserName
        )
        userAssetsS3Bucket = (
            "recursivethinking-rct-user-assets-"
            + args.region
            + "-"
            + stripedUserName
        )

# make the s3 bucket (seems to fail silently if the bucket is already made.)
call(
    'aws s3 mb "s3://{0}" --region={1}'.format(assetsS3bucket, args.region),
    shell=True,
)

# upload lambda assets
# NOTE: we're using posixpath here for cross-compatibility b/c python doesn't seem to care and s3 needs the paths to be in posix format (i.e. Mac or Linux but not Windows)
build_dir = datetime.datetime.fromtimestamp(time.time()).strftime(
    "%Y%m%d%H%M%S"
)
for subdir in os.listdir(args.assets):
    print("")
    # ---------------------------------- START FOR MAC ---------------------------------
    # -- IF YOU ARE ON MAC - TURN BETWEEN START/END ON AND BETWEEN START/END PC OFF --
    # lambda_path = posixpath.join(args.assets, subdir)

    # if posixpath.isdir(lambda_path):
    #     zip_file_path = shutil.make_archive(subdir, 'zip', lambda_path)
    #     call("aws s3 cp {0} s3://{1}/{2}/".format(zip_file_path, s3bucket, build_dir), shell=True)

    # ----------------------------------- END FOR MAC ----------------------------------

    # ---------------------------------- START FOR PC ----------------------------------
    # -- IF YOU ARE ON PC - TURN BETWEEN START/END ON AND BETWEEN START/END MAC OFF --
    lambda_path = "{0}/{1}".format(args.assets, subdir)

    if os.path.isdir(lambda_path):
        shutil.make_archive(subdir, "zip", lambda_path)
        zip_file_path = "./{0}{1}".format(subdir, ".zip")
        call(
            "aws s3 cp {0} s3://{1}/{2}/".format(
                zip_file_path, assetsS3bucket, build_dir
            ),
            shell=True,
        )

        # ----------------------------------- END FOR PC -----------------------------------

        # Do you want to see the .zip filesas they upload?  IF SO, KEEP BELOW ON.  IF NOT, COMMENT BELOW OUT
        call("rm -f {0}".format(zip_file_path), shell=True)

# execute the cloudformation update
call(
    "aws cloudformation deploy --s3-bucket={3} --template-file {1} --stack-name recursive-thinking-server{0} --capabilities=CAPABILITY_NAMED_IAM --parameter-overrides LambdaFolder={2} AssetsS3Bucket={3} UserAssetsS3Bucket={5} --region={4}".format(
        args.stage,
        args.template,
        build_dir,
        assetsS3bucket,
        args.region,
        userAssetsS3Bucket,
    ),
    shell=True,
)

# get stack info
status = check_output(
    "aws cloudformation describe-stacks --stack-name={0} --region={1}".format(
        "recursive-thinking-server", args.region
    ),
    shell=True,
)
stack_response = json.loads(status)
# print(stack_response)

# FOLDER NAME INFO FOR LOG DIRECTOR(IES)
deployDatetime = datetime.datetime.now()
dateString = deployDatetime.strftime("%Y%m%d")
timeString = deployDatetime.strftime("%H%M%S")

stackResponseInfoString = json.dumps(stack_response, indent=2, sort_keys=True)

stackStatus = stack_response["Stacks"][0]["StackStatus"]

# this needs the api value (same as the APIURL below)
# This makes a "dev" Stage for the API and deploys it.
# check_output(
#     "aws apigateway create-deployment --rest-api-id {0} --stage-name dev --region={1}".format(
#         stack_response["Stacks"][0]["Outputs"][4]["OutputValue"], args.region
#     ),
#     shell=True,
# )

if stackStatus in cloudformationDeploySuccessDictionary:

    deployDirectoryPath = join(
        ".",
        "deployment_logs",
        "deploy_stack",
        "success",
        dateString,
        timeString,
        "stack_response.json",
    )

    #  BUILD SECRETS/CREDENTIAL FILES
    # 'Description': 'apiUrl - The base id of the api, used for constructing the api url to make requests'
    credentials = {
        "region": args.region,
        "userPoolId": stack_response["Stacks"][0]["Outputs"][1]["OutputValue"],
        # "userPoolWebClientId": stack_response["Stacks"][0]["Outputs"][2][
        #     "OutputValue"
        # ],
        # "apiUrl": "https://{0}.execute-api.{1}.amazonaws.com/dev".format(
        #     stack_response["Stacks"][0]["Outputs"][4]["OutputValue"],
        #     args.region,
        # ),
    }

    # Look for this in outputs
    # 'Description': 's3BucketName - Name of s3 Bucket', 'ExportName': 's3BucketName',
    # s3UploadInfo = {
    #     "region": args.region,
    #     "s3BucketName": stack_response["Stacks"][0]["Outputs"][3][
    #         "OutputValue"
    #     ],
    #     "IdentityPoolId": stack_response["Stacks"][0]["Outputs"][0][
    #         "OutputValue"
    #     ],
    # }

    # CONVERT DICTIONARIES TO JSON
    credentialsString = json.dumps(credentials, indent=2, sort_keys=True)
    # s3UploadInfoString = json.dumps(s3UploadInfo, indent=2, sort_keys=True)
    maybeWebsitePath = realpath(args.website_directory)

    # WRITE STACK SECRET DATA TO FILE
    # CHECK FILE PATH
    # IF NOT FOUND, ERROR, IF FOUND WRITE FILE

    if os.path.isdir(
        maybeWebsitePath
    ):  # if maybeWebsitePath is a real folder...
        print(Fore.GREEN, "Stack Creation Successful" + Style.RESET_ALL)
        cognitoSecretsPath = abspath(
            join(maybeWebsitePath, "credentials/secrets", "cognitoSecrets.json")
        )
        cognitoSecrets = safeOpen(cognitoSecretsPath, "w")
        cognitoSecrets.write(credentialsString)
        cognitoSecrets.close()
        print("    Wrote secrets to ", cognitoSecretsPath)
        # s3UploadSecretsPath = abspath(
        #     join(
        #         maybeWebsitePath, "credentials/secrets", "s3UploadSecrets.json"
        #     )
        # )
        # s3UploadSecrets = safeOpen(s3UploadSecretsPath, "w")
        # s3UploadSecrets.write(s3UploadInfoString)
        # s3UploadSecrets.close()
        # print("    Wrote secrets to ", s3UploadSecretsPath)
        print(
            "    If this isn't what you expected, please use the --website-directory argument."
        )
    else:
        print(
            Fore.RED,
            "Failed to write secrets. Please copy/paste the following secrets output below to: ",
        )

        print(
            "./recursive_thinking_website/secrets/credentials/cognitoSecrets.json"
        )
        print(credentialsString)
        # print("")
        # print(
        #     "./recursive_thinking_website/credentials/secrets/s3UploadSecrets.json"
        # )
        # print(s3UploadInfoString)
        print("")

else:
    deployDirectoryPath = join(
        ".",
        "deployment_logs",
        "deploy_stack",
        "errors",
        dateString,
        timeString,
        "stack_response.json",
    )

    print(
        Fore.RED,
        "Problem with Stack Creation, Please check log at: ",
        deployDirectoryPath,
    )

    print(Fore.RED, "Stack Creation Failed, Did not Write Credential Files")

# WRITE STACK LOGS - EITHER SUCCESS OR FAIL
deployStack = safeOpen(deployDirectoryPath, "w")
deployStack.write(stackResponseInfoString)
deployStack.close()
