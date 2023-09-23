const id = "class-to-array-and-back-again.mdx";
						const collection = "post";
						const slug = "class-to-array-and-back-again";
						const body = "\n## The problem\n\nWhen passing around a lot of data collections, sometimes I'll assume something\nis an object, when it's actually an array.\n\n```php\n$climbingGear->carabiners->lockers;  // ❌\n$climbingGear['carabiners']['lockers']; // this is what it actually is\n```\n\nThis is always a pain to fix. Usually I'll make a quick macro to surround the\nproperty with quotes and brackets, then finally remove the arrow. But now I've\ngot a much more efficient way. Behold!\n\n## The solution\n\n![Screen capture showing neovim editor, changing php class proprties to array](https://res.cloudinary.com/dawwvmppi/image/upload/v1671819629/neovim-php-class-to-array_lnwvvv.gif)\n\n```lua\nkeymap('n', '<leader>cta', \"<cmd>s/\\\\(->\\\\)\\\\(\\\\w*\\\\)/['\\\\2']/g<cr>\")\n\nkeymap('n', '<leader>atc', \"<cmd>s/\\\\(\\\\['\\\\)\\\\(\\\\w*\\\\)\\\\('\\\\]\\\\)/->\\\\2/g<cr>\")\n```\n";
						const data = {title:"Neovim: PHP class property to array and back again",description:"A handy keymap when I forget if some data is an object or an array",publishDate:new Date(1671778800000),draft:false,tags:["neovim"]};
						const _internal = {
							type: 'content',
							filePath: "/Users/mpk/Sites/mpk.dev/src/content/post/class-to-array-and-back-again.mdx",
							rawData: "\ntitle: \"Neovim: PHP class property to array and back again\"\npublishDate: 23 Dec 2022\ndescription: A handy keymap when I forget if some data is an object or an array\ntags: [\"neovim\"]",
						};

export { _internal, body, collection, data, id, slug };
