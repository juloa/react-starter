const manageTranslations = require('react-intl-translations-manager').default;
 
manageTranslations({
  messagesDirectory: 'extractedMessages',
  translationsDirectory: 'src/locales/',
  languages: ['fr','en'] // any language you need
});
