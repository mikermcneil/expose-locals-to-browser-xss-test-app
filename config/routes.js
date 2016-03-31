/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  'get /': { view: 'homepage' },

  'get /basic': function (req, res) {
    return res.view('homepage', {
      foo: 323523,
      bar: 'stuff',
      baz: false,
      bing: [],
      bong: {},
    });
  },

  'get /basic-xss-attack': function (req,res) {
    return res.view('homepage', {
      xssAttack: '\';alert(String.fromCharCode(88,83,83))//\';alert(String.fromCharCode(88,83,83))//";\nalert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//--\n></SCRIPT>">\'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>'
    });
  },

  'get /nested-xss-attack': function (req,res) {
    return res.view('homepage', {
      xssAttack: {
        surprise: '\';alert(String.fromCharCode(88,83,83))//\';alert(String.fromCharCode(88,83,83))//";\nalert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//--\n></SCRIPT>">\'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>',
        foo: {
          bar: {
            baz: {
              surprise: [
                '\';alert(String.fromCharCode(88,83,83))//\';alert(String.fromCharCode(88,83,83))//";\nalert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//--\n></SCRIPT>">\'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>',
                [
                  [
                    '\';alert(String.fromCharCode(88,83,83))//\';alert(String.fromCharCode(88,83,83))//";\nalert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//--\n></SCRIPT>">\'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>'
                  ]
                ]
              ]
            },
            surprise: '\';alert(String.fromCharCode(88,83,83))//\';alert(String.fromCharCode(88,83,83))//";\nalert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//--\n></SCRIPT>">\'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>'
          }
        }
      }
    });
  },

  'get /misc-xss-attacks': function (req, res) {
    return res.view('homepage', {
      xssAttacks: [

        // • https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet#XSS_Locator
        '\';alert(String.fromCharCode(88,83,83))//\';alert(String.fromCharCode(88,83,83))//";\nalert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//--\n></SCRIPT>">\'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>',

        // • https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet#On_error_alert
        '<IMG SRC=/ onerror="alert(String.fromCharCode(88,83,83))"></img>',

        // ...
        //
        // Please feel free to add more here!
        // see https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
      ]
    });
  },

  'get /edge-cases': function (req, res) {
    return res.view('homepage', {
      foo: '*',
      bar: '===',
      baz: '->',
      bing: '',
      bong: 0,
      beep: null,
      boop: undefined,// << will be stripped
      bop: function (a,b){console.log('oh hey');},// << will be stringified
    });
  },

  'get /nested': function (req, res) {
    return res.view('homepage', {
      nestedInDictionary: {
        foo: 323523,
        bar: 'stuff',
        baz: false,
        bing: [],
        bong: {},
      },
      nestedInArray: [
        323523,
        'stuff',
        false,
        [],
        {},
      ],
      nestedDeep: {
        deeper: {
          evenDeeper: [
            {
              anotherDictionary: {
                foo: 323523,
                bar: 'stuff',
                baz: false,
                bing: [],
                bong: {},
              }
            },
            {
              anotherArray: [
                323523,
                'stuff',
                false,
                [],
                {},
              ],
              doubleDeepArrays: [
                [
                  [
                    [],
                    [323523,'32532',undefined],
                    ['null','undefined',null,undefined]
                  ]
                ]
              ]
            }
          ]
        }
      },
      edgeCasesNestedInDictionary: {
        foo: '*',
        bar: '===',
        baz: '->',
        bing: '',
        bong: 0,
        beep: null,
        boop: undefined,// << will be stripped
        bop: function (a,b){console.log('oh hey');},// << will be stringified
      },
      edgeCasesNestedInArray: [
        '*',
        '===',
        '->',
        '',
        0,
        null,
        undefined,// << will be stripped
        function (a,b){console.log('oh hey');},// << will be stringified
      ]
    });
  },

};
