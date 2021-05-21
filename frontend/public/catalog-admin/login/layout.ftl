<#macro registrationLayout title="">
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex, nofollow">
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width"
    />
    <meta name="theme-color" content="#ffffff" />
    <meta
      name="description"
      content="Autenticação do CodeFlix"
    />
    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

    <title>${msg("loginTitle",(realm.displayName!''))}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script>
     var layoutProps = {
       //loginTitle: "${kcSanitize(msg("loginTitleHtml",(realm.displayNameHtml!'')))?no_esc}",
       i18nEnabled: ${realm.internationalizationEnabled?string},
       <#if realm.internationalizationEnabled && locale.supported?size gt 1>
        locale: {
          currentLocale: "${locale.current}",
          locales: [
            <#list locale.supported as l>
              {
                label: "${l.label}",
                url: "${l.url?no_esc}"
              },
            </#list>
          ]
        },
       </#if>
       title: "${title}",
       <#if message?has_content>
        message: {type: "${message.type}", content: "${message.summary}"},
       </#if>
       <#if isAppInitiatedAction??>
        isAppInitiatedAction: ${isAppInitiatedAction?string},
       <#else>
        isAppInitiatedAction: false,
       </#if>
     };
     console.log(layoutProps);
    </script>
    <#nested "scripts">
  </body>
</html>
</#macro>
