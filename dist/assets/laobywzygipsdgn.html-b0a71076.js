const e=JSON.parse('{"key":"v-b1272496","path":"/nice-article/weixin/laobywzygipsdgn.html","title":"老板要我做一个 IP 属地功能~","lang":"zh-CN","frontmatter":{"title":"老板要我做一个 IP 属地功能~","shortTitle":"老板要我做一个 IP 属地功能~","author":"不才陈某","category":["微信公众号"],"description":"大家好，我是二哥呀~ 细心的朋友应该会发现，继新浪微博之后，头条、腾讯、抖音、知乎、快手、小红书等各大平台陆陆续续都上线了“网络用户 IP 地址显示功能”，境外用户显示的是国家，国内的用户显示的省份，而且此项显示无法关闭，归属地强制显示。 作为技术人，那！这个功能要怎么实现呢？ HttpServletRequest 获取 IP 下面，我就来讲讲，Java 中是如何获取 IP 属地的，主要分为以下几步： 通过 HttpServletRequest 对象，获取用户的 「IP」 地址 通过 IP 地址，获取对应的省份、城市","head":[["meta",{"property":"og:url","content":"https://javabetter.cn/nice-article/weixin/laobywzygipsdgn.html"}],["meta",{"property":"og:site_name","content":"二哥的Java进阶之路"}],["meta",{"property":"og:title","content":"老板要我做一个 IP 属地功能~"}],["meta",{"property":"og:description","content":"大家好，我是二哥呀~ 细心的朋友应该会发现，继新浪微博之后，头条、腾讯、抖音、知乎、快手、小红书等各大平台陆陆续续都上线了“网络用户 IP 地址显示功能”，境外用户显示的是国家，国内的用户显示的省份，而且此项显示无法关闭，归属地强制显示。 作为技术人，那！这个功能要怎么实现呢？ HttpServletRequest 获取 IP 下面，我就来讲讲，Java 中是如何获取 IP 属地的，主要分为以下几步： 通过 HttpServletRequest 对象，获取用户的 「IP」 地址 通过 IP 地址，获取对应的省份、城市"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-12-26T13:49:42.000Z"}],["meta",{"property":"article:author","content":"不才陈某"}],["meta",{"property":"article:modified_time","content":"2022-12-26T13:49:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"老板要我做一个 IP 属地功能~\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-12-26T13:49:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"不才陈某\\"}]}"]]},"headers":[{"level":2,"title":"HttpServletRequest 获取 IP","slug":"httpservletrequest-获取-ip","link":"#httpservletrequest-获取-ip","children":[]},{"level":2,"title":"Ip2region","slug":"ip2region","link":"#ip2region","children":[]},{"level":2,"title":"99.9%准确率：","slug":"_99-9-准确率","link":"#_99-9-准确率","children":[]},{"level":2,"title":"多查询客户端的支持","slug":"多查询客户端的支持","link":"#多查询客户端的支持","children":[]},{"level":2,"title":"Ip2region V2.0 特性","slug":"ip2region-v2-0-特性","link":"#ip2region-v2-0-特性","children":[]},{"level":2,"title":"ip2region xdb java 查询客户端实现","slug":"ip2region-xdb-java-查询客户端实现","link":"#ip2region-xdb-java-查询客户端实现","children":[]},{"level":2,"title":"IDEA 中做个测试","slug":"idea-中做个测试","link":"#idea-中做个测试","children":[]},{"level":2,"title":"编译测试程序","slug":"编译测试程序","link":"#编译测试程序","children":[]},{"level":2,"title":"查询测试","slug":"查询测试","link":"#查询测试","children":[]},{"level":2,"title":"bench 测试","slug":"bench-测试","link":"#bench-测试","children":[]}],"git":{"createdTime":1659691518000,"updatedTime":1672062582000,"contributors":[{"name":"itwanger","email":"www.qing_gee@163.com","commits":2}]},"readingTime":{"minutes":9.34,"words":2803},"filePathRelative":"nice-article/weixin/laobywzygipsdgn.md","localizedDate":"2022年8月5日","excerpt":"<p>大家好，我是二哥呀~</p>\\n<p>细心的朋友应该会发现，继新浪微博之后，头条、腾讯、抖音、知乎、快手、小红书等各大平台陆陆续续都上线了“<strong>网络用户 IP 地址显示功能</strong>”，境外用户显示的是国家，国内的用户显示的省份，而且此项显示无法关闭，归属地强制显示。</p>\\n<p>作为技术人，那！这个功能要怎么实现呢？</p>\\n<h2> HttpServletRequest 获取 IP</h2>\\n<p>下面，我就来讲讲，Java 中是如何获取 IP 属地的，主要分为以下几步：</p>\\n<ul>\\n<li>通过 HttpServletRequest 对象，获取用户的 <strong>「IP」</strong> 地址</li>\\n<li>通过 IP 地址，获取对应的省份、城市</li>\\n</ul>","autoDesc":true}');export{e as data};
