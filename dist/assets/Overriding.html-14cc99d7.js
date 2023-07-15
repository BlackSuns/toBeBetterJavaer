const e=JSON.parse('{"key":"v-079af819","path":"/basic-extra-meal/Overriding.html","title":"Java重写（Overriding）时应当遵守的11条规则","lang":"zh-CN","frontmatter":{"title":"Java重写（Overriding）时应当遵守的11条规则","shortTitle":"重写时应当遵守的11条规则","category":["Java核心"],"tag":["Java重要知识点"],"description":"二哥的Java进阶之路，小白的零基础Java教程，从入门到进阶，Java重写（Overriding）时应当遵守的11条规则","head":[["meta",{"name":"keywords","content":"Java,Java SE,Java基础,Java教程,二哥的Java进阶之路,Java进阶之路,Java入门,教程,java,重写,Overriding"}],["meta",{"property":"og:url","content":"https://javabetter.cn/basic-extra-meal/Overriding.html"}],["meta",{"property":"og:site_name","content":"二哥的Java进阶之路"}],["meta",{"property":"og:title","content":"Java重写（Overriding）时应当遵守的11条规则"}],["meta",{"property":"og:description","content":"二哥的Java进阶之路，小白的零基础Java教程，从入门到进阶，Java重写（Overriding）时应当遵守的11条规则"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-24T02:39:04.000Z"}],["meta",{"property":"article:author","content":"沉默王二"}],["meta",{"property":"article:tag","content":"Java重要知识点"}],["meta",{"property":"article:modified_time","content":"2023-04-24T02:39:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java重写（Overriding）时应当遵守的11条规则\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-24T02:39:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"沉默王二\\",\\"url\\":\\"/about-the-author/\\"}]}"]]},"headers":[{"level":2,"title":"01、什么是重写？","slug":"_01、什么是重写","link":"#_01、什么是重写","children":[]},{"level":2,"title":"02、哪些方法可以被重写？","slug":"_02、哪些方法可以被重写","link":"#_02、哪些方法可以被重写","children":[{"level":3,"title":"规则一：只能重写继承过来的方法。","slug":"规则一-只能重写继承过来的方法。","link":"#规则一-只能重写继承过来的方法。","children":[]}]},{"level":2,"title":"03、哪些方法不能被重写？","slug":"_03、哪些方法不能被重写","link":"#_03、哪些方法不能被重写","children":[{"level":3,"title":"规则二：final、static 的方法不能被重写。","slug":"规则二-final、static-的方法不能被重写。","link":"#规则二-final、static-的方法不能被重写。","children":[]}]},{"level":2,"title":"04、重写方法的要求","slug":"_04、重写方法的要求","link":"#_04、重写方法的要求","children":[{"level":3,"title":"规则三：重写的方法必须有相同的参数列表。","slug":"规则三-重写的方法必须有相同的参数列表。","link":"#规则三-重写的方法必须有相同的参数列表。","children":[]},{"level":3,"title":"规则五：重写的方法不能使用限制等级更严格的权限修饰符。","slug":"规则五-重写的方法不能使用限制等级更严格的权限修饰符。","link":"#规则五-重写的方法不能使用限制等级更严格的权限修饰符。","children":[]},{"level":3,"title":"规则六：重写后的方法不能抛出比父类中更高级别的异常。","slug":"规则六-重写后的方法不能抛出比父类中更高级别的异常。","link":"#规则六-重写后的方法不能抛出比父类中更高级别的异常。","children":[]}]},{"level":2,"title":"05、如何调用被重写的方法？","slug":"_05、如何调用被重写的方法","link":"#_05、如何调用被重写的方法","children":[{"level":3,"title":"规则七：可以在子类中通过 super 关键字来调用父类中被重写的方法。","slug":"规则七-可以在子类中通过-super-关键字来调用父类中被重写的方法。","link":"#规则七-可以在子类中通过-super-关键字来调用父类中被重写的方法。","children":[]}]},{"level":2,"title":"06、重写和构造方法","slug":"_06、重写和构造方法","link":"#_06、重写和构造方法","children":[{"level":3,"title":"规则八：构造方法不能被重写。","slug":"规则八-构造方法不能被重写。","link":"#规则八-构造方法不能被重写。","children":[]}]},{"level":2,"title":"07、重写和抽象方法","slug":"_07、重写和抽象方法","link":"#_07、重写和抽象方法","children":[{"level":3,"title":"规则九：如果一个类继承了抽象类，抽象类中的抽象方法必须在子类中被重写。","slug":"规则九-如果一个类继承了抽象类-抽象类中的抽象方法必须在子类中被重写。","link":"#规则九-如果一个类继承了抽象类-抽象类中的抽象方法必须在子类中被重写。","children":[]}]},{"level":2,"title":"08、重写和 synchronized 方法","slug":"_08、重写和-synchronized-方法","link":"#_08、重写和-synchronized-方法","children":[{"level":3,"title":"规则十：synchronized 关键字对重写规则没有任何影响。","slug":"规则十-synchronized-关键字对重写规则没有任何影响。","link":"#规则十-synchronized-关键字对重写规则没有任何影响。","children":[]}]},{"level":2,"title":"09、重写和 strictfp 方法","slug":"_09、重写和-strictfp-方法","link":"#_09、重写和-strictfp-方法","children":[{"level":3,"title":"规则十一：strictfp 关键字对重写规则没有任何影响。","slug":"规则十一-strictfp-关键字对重写规则没有任何影响。","link":"#规则十一-strictfp-关键字对重写规则没有任何影响。","children":[]}]}],"git":{"createdTime":1647355350000,"updatedTime":1682303944000,"contributors":[{"name":"itwanger","email":"www.qing_gee@163.com","commits":11},{"name":"沉默王二","email":"www.qing_gee@163.com","commits":3}]},"readingTime":{"minutes":7.4,"words":2219},"filePathRelative":"basic-extra-meal/Overriding.md","localizedDate":"2022年3月15日","excerpt":"<p>重写（Overriding）算是 Java 中一个非常重要的概念，理解重写到底是什么对每个 Java 程序员来说都至关重要，这篇文章就来给大家说说重写过程中应当遵守的 12 条规则。</p>\\n<h2> 01、什么是重写？</h2>\\n<p>重写带来了一种非常重要的能力，可以让子类重新实现从超类那继承过来的方法。在下面这幅图中，Animal 是父类，Dog 是子类，Dog 重新实现了 <code>move()</code> 方法用来和父类进行区分，毕竟狗狗跑起来还是比较有特色的。</p>\\n<figure><img src=\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/Overriding-1.png\\" alt=\\"\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>"}');export{e as data};
