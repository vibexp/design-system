/* global React, useState, Section, SubHead, SubNote, Example, PropTable, Callout, Icon, Btn, Badge */

/* interactive checkbox */
function DemoCheckbox({ defaultChecked }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <span className="sh-check" data-checked={on || undefined} onClick={() => setOn(!on)} role="checkbox" aria-checked={on} tabIndex={0}
      onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); setOn(!on); } }}>
      <Icon name="check" size={14} stroke={3} />
    </span>
  );
}

function DemoSwitch({ defaultChecked }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <button className="sh-switch" data-checked={on || undefined} onClick={() => setOn(!on)} role="switch" aria-checked={on}>
      <span className="sh-switch__thumb" />
    </button>
  );
}

function DemoTabs() {
  const tabs = ["Overview", "Activity", "Settings"];
  const [active, setActive] = useState("Overview");
  return (
    <div className="col" style={{ gap: 14, width: "100%" }}>
      <div className="sh-tabs-list">
        {tabs.map((t) => (
          <button key={t} className="sh-tab" data-active={active === t || undefined} onClick={() => setActive(t)}>{t}</button>
        ))}
      </div>
      <div style={{ fontSize: 14, color: "var(--muted-foreground)", padding: "4px 2px" }}>
        {active === "Overview" && "Agent health, recent runs and token usage at a glance."}
        {active === "Activity" && "A reverse-chronological feed of executions and events."}
        {active === "Settings" && "Model, permissions and trigger configuration."}
      </div>
    </div>
  );
}

function DemoSelect() {
  const opts = ["Claude Sonnet", "Claude Opus", "GPT-4o", "Gemini Pro"];
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("Claude Sonnet");
  return (
    <div style={{ position: "relative", width: 240 }}>
      <button className="sh-select" onClick={() => setOpen(!open)}>
        <span>{val}</span>
        <Icon name="chevronDown" size={16} />
      </button>
      {open && (
        <div className="sh-select-content" style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 5 }}>
          {opts.map((o) => (
            <div key={o} className="sh-select-item" data-active={o === val || undefined}
              onClick={() => { setVal(o); setOpen(false); }}>
              {o === val && <Icon name="check" size={14} className="check" />}
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ComponentsSection() {
  return (
    <Section
      id="components"
      eyebrow="Library"
      title="Components"
      lead="Faithful recreations of the shadcn/ui primitives in the codebase — default style, Radix-backed, Lucide icons. Each example shows the authentic className string from the component source; copy it straight into a .tsx file."
    >
      <Callout>
        Import paths follow the project aliases: <code>@/components/ui/*</code> for primitives,{" "}
        <code>@/components/*</code> for composed helpers (StatusBadge, EmptyState, PageHeader).
      </Callout>

      {/* BUTTON */}
      <SubHead>Button</SubHead>
      <SubNote>Six variants × four sizes. <code>asChild</code> renders the styles onto any element (e.g. a router link).</SubNote>
      <Example
        code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}
      >
        <Btn>Default</Btn>
        <Btn variant="secondary">Secondary</Btn>
        <Btn variant="outline">Outline</Btn>
        <Btn variant="ghost">Ghost</Btn>
        <Btn variant="destructive">Destructive</Btn>
        <Btn variant="link">Link</Btn>
      </Example>
      <div style={{ height: 14 }} />
      <Example
        code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus /></Button>
<Button><Plus /> With icon</Button>`}
      >
        <Btn size="sm">Small</Btn>
        <Btn>Default</Btn>
        <Btn size="lg">Large</Btn>
        <Btn size="icon" aria-label="Add"><Icon name="plus" /></Btn>
        <Btn><Icon name="plus" /> With icon</Btn>
        <Btn variant="brand"><Icon name="bot" /> Brand</Btn>
      </Example>
      <div style={{ height: 16 }} />
      <PropTable
        cols={["Prop", "Values", "Default"]}
        rows={[
          [<code>variant</code>, <code>default · secondary · outline · ghost · destructive · link</code>, <code>default</code>],
          [<code>size</code>, <code>default · sm · lg · icon</code>, <code>default</code>],
          [<code>asChild</code>, <code>boolean</code>, <code>false</code>],
        ]}
      />

      {/* BADGE */}
      <SubHead>Badge</SubHead>
      <SubNote>Pill labels. The composed <code>StatusBadge</code> adds semantic tones over the four base variants.</SubNote>
      <Example
        code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`}
      >
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </Example>

      {/* INPUT */}
      <SubHead>Input, Textarea & Label</SubHead>
      <SubNote>Full-width, 40px tall, with a focus ring driven by <code>--ring</code>.</SubNote>
      <Example block
        code={`<div className="space-y-2">
  <Label htmlFor="email">Work email</Label>
  <Input id="email" type="email" placeholder="you@vibexp.io" />
</div>`}
      >
        <div className="col" style={{ maxWidth: 360 }}>
          <label className="sh-label" htmlFor="ex-email">Work email</label>
          <input className="sh-input" id="ex-email" type="email" placeholder="you@vibexp.io" />
          <label className="sh-label" htmlFor="ex-prompt" style={{ marginTop: 10 }}>Prompt</label>
          <textarea className="sh-input sh-textarea" id="ex-prompt" placeholder="Describe what the agent should do…" />
          <div className="row" style={{ marginTop: 4 }}>
            <input className="sh-input" placeholder="Disabled" disabled style={{ maxWidth: 200 }} />
          </div>
        </div>
      </Example>

      {/* SELECT */}
      <SubHead>Select</SubHead>
      <SubNote>Radix Select — trigger matches Input metrics; menu floats in a <code>bg-popover</code> surface with a check on the active item.</SubNote>
      <Example
        code={`<Select>
  <SelectTrigger><SelectValue placeholder="Model" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="sonnet">Claude Sonnet</SelectItem>
  </SelectContent>
</Select>`}
      >
        <DemoSelect />
      </Example>

      {/* CHECKBOX + SWITCH */}
      <SubHead>Checkbox & Switch</SubHead>
      <SubNote>Both fill with <code>--primary</code> when on. Switch is a 44×24 track — comfortably above the 44px hit-target floor with its label.</SubNote>
      <Example
        code={`<Checkbox defaultChecked /> <Label>Email me on completion</Label>
<Switch defaultChecked />`}
      >
        <label className="row" style={{ gap: 9 }}>
          <DemoCheckbox defaultChecked /> <span className="sh-label">Email me on completion</span>
        </label>
        <label className="row" style={{ gap: 9 }}>
          <DemoCheckbox /> <span className="sh-label">Run on a schedule</span>
        </label>
        <div style={{ width: 24 }} />
        <label className="row" style={{ gap: 9 }}>
          <DemoSwitch defaultChecked /> <span className="sh-label">Auto-approve</span>
        </label>
        <DemoSwitch />
      </Example>

      {/* CARD */}
      <SubHead>Card</SubHead>
      <SubNote>The core surface: <code>rounded-lg border bg-card shadow-sm</code> with Header / Content / Footer slots.</SubNote>
      <Example center
        code={`<Card>
  <CardHeader>
    <CardTitle>Deploy agent</CardTitle>
    <CardDescription>Push this blueprint to production.</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter><Button>Deploy</Button></CardFooter>
</Card>`}
      >
        <div className="sh-card" style={{ width: 340 }}>
          <div className="sh-card__header">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="sh-card__title" style={{ fontSize: "1.05rem" }}>Deploy agent</div>
              <Badge variant="success">Ready</Badge>
            </div>
            <div className="sh-card__desc">Push this blueprint to the production workspace.</div>
          </div>
          <div className="sh-card__content">
            <div className="row" style={{ justifyContent: "space-between", fontSize: 13, color: "var(--muted-foreground)" }}>
              <span>Model</span><span style={{ color: "var(--foreground)" }}>Claude Sonnet</span>
            </div>
            <div className="sh-separator sh-separator--h" style={{ margin: "10px 0" }} />
            <div className="row" style={{ justifyContent: "space-between", fontSize: 13, color: "var(--muted-foreground)" }}>
              <span>Triggers</span><span style={{ color: "var(--foreground)" }}>3 active</span>
            </div>
          </div>
          <div className="sh-card__footer">
            <Btn variant="brand" style={{ flex: 1 }}>Deploy</Btn>
            <Btn variant="outline">Cancel</Btn>
          </div>
        </div>
      </Example>

      {/* ALERT */}
      <SubHead>Alert</SubHead>
      <SubNote>Inline messaging with optional leading icon. <code>default</code> and <code>destructive</code> variants.</SubNote>
      <Example block
        code={`<Alert>
  <Info />
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Your trial ends in 5 days.</AlertDescription>
</Alert>`}
      >
        <div className="stack" style={{ maxWidth: 520 }}>
          <div className="sh-alert">
            <Icon name="info" size={16} />
            <div>
              <div className="sh-alert__title">Heads up</div>
              <div className="sh-alert__desc">Your trial ends in 5 days. Add a payment method to keep agents running.</div>
            </div>
          </div>
          <div className="sh-alert sh-alert--destructive">
            <Icon name="alert" size={16} />
            <div>
              <div className="sh-alert__title">Run failed</div>
              <div className="sh-alert__desc">The agent exceeded its token budget before completing.</div>
            </div>
          </div>
        </div>
      </Example>

      {/* TABS */}
      <SubHead>Tabs</SubHead>
      <SubNote>Segmented control on a <code>bg-muted</code> track; the active trigger lifts onto <code>bg-background</code> with a shadow.</SubNote>
      <Example block code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
</Tabs>`}>
        <DemoTabs />
      </Example>

      {/* TABLE */}
      <SubHead>Table</SubHead>
      <SubNote>12px header height, muted header text, row hover. The basis for the composed DataTable pattern.</SubNote>
      <Example block code={`<Table>
  <TableHeader><TableRow><TableHead>Agent</TableHead>…</TableRow></TableHeader>
  <TableBody><TableRow><TableCell>…</TableCell></TableRow></TableBody>
</Table>`}>
        <div className="sh-table-wrap">
          <table className="sh-table">
            <thead>
              <tr><th>Agent</th><th>Model</th><th>Status</th><th style={{ textAlign: "right" }}>Runs</th></tr>
            </thead>
            <tbody>
              <tr><td>Triage bot</td><td>Claude Sonnet</td><td><Badge variant="success">Active</Badge></td><td style={{ textAlign: "right" }}>1,284</td></tr>
              <tr><td>Release notes</td><td>Claude Opus</td><td><Badge variant="warning">Pending</Badge></td><td style={{ textAlign: "right" }}>92</td></tr>
              <tr><td>PR reviewer</td><td>GPT-4o</td><td><Badge variant="neutral">Draft</Badge></td><td style={{ textAlign: "right" }}>0</td></tr>
            </tbody>
          </table>
        </div>
      </Example>

      {/* AVATAR + SEPARATOR + SKELETON + TOOLTIP */}
      <SubHead>Avatar, Separator, Skeleton & Tooltip</SubHead>
      <SubNote>Supporting primitives for identity, division, loading and hints.</SubNote>
      <Example
        code={`<Avatar><AvatarFallback>SA</AvatarFallback></Avatar>
<Separator orientation="vertical" />
<Skeleton className="h-4 w-40" />
<Tooltip>…</Tooltip>`}
      >
        <div className="sh-avatar"><span className="sh-avatar__fallback" style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}>SA</span></div>
        <div className="sh-avatar"><span className="sh-avatar__fallback">JK</span></div>
        <div className="sh-separator sh-separator--v" style={{ height: 36 }} />
        <div className="col" style={{ gap: 8 }}>
          <div className="sh-skeleton" style={{ height: 14, width: 180 }} />
          <div className="sh-skeleton" style={{ height: 14, width: 120 }} />
        </div>
        <div className="sh-separator sh-separator--v" style={{ height: 36 }} />
        <div className="sh-tooltip">Re-run agent</div>
      </Example>
    </Section>
  );
}

Object.assign(window, { ComponentsSection });
