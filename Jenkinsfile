
def appName = 'dropbox-typescript'

def conditionals = [
    [
        condition: { env.TARGET_BRANCH == 'master' && env.SCM_ACTION == 'commit' },
        overrides: [
            nodejsPublish: true,
            nodejsPublishBumpPatchVersion: true,
            nodejsPublishPushVersionTag: true
        ]
    ]
]

nodejsPipeline(
  nodeVersion: '11.0.0',
  appName: appName,
  conditionals: conditionals,
  installArgs: '--no-optional',
  nodejsInstallMethod: 'npm',
  nodejsBuildMethod: 'npm',
  nodejsTestMethod: 'npm',
  slack:[channel:'eng-agreement-action']
)
