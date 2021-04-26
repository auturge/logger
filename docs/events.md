# Events

In c# it goes something like

```c#
public class ClassA {
    public delegate void SampleEventHandler(object sender, SampleEventArgs e);

    public event SampleEventHandler SampleEvent;

    protected virtual void RaiseSampleEvent() {
        SampleEvent?.Invoke(this, new SampleEventArgs("Hello"));
    }
}

public class ClassB {
    
    public void DoThing(ClassA classA) {
        classA.SampleEvent += Reaction;
    }

    public void Reaction(object sender, SampleEventArgs e) {
        // Do a thing.
    }
}
```

In TypeScript, I want it to look something like this:

```ts
public class ClassA {
    public sampleEvent: Emitter<SampleEventArgs> = new Emitter();
    
    public onSampleEvent(): void {
        this.sampleEvent?.emit(this, new sampleEventArgs("Hello"));
    }
}

public class ClassB {
    public DoThing(classA: ClassA): void {
        classA.sampleEvent.listen(Reaction);
    }

    public Reaction(sender: object, e: sampleEventArgs): void {
        // Do a thing.
    }
}
```
